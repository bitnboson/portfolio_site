---
title: "I Spent 4 Hours Setting Up the RV1103 SDK, So You Don't Have To"
date: "2026-09-12"
excerpt: "A fast-track guide to setting up a complete RV1103 cross-compilation environment with the Luckfox Pico SDK, CMake, clangd, and a one-command build-upload-run workflow."
tags: ["RV1103", "Luckfox Pico", "Embedded Linux", "Cross Compilation", "CMake", "Rockchip", "C++", "Tutorial"]
cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=70"
---

Hi! I'm new to this whole blogging thing. The idea here is simple: give you the commands and configs up front so you can copy-paste and move on, and if you've got a spare few minutes, stick around for the "why" behind each step.

Speedsters — just follow the code blocks. Everyone else, the quotes are for you.

> This is a companion piece to my [rv1103-dev-template](https://github.com/bitnboson/rv1103-dev-template) repo, which has every file below ready to clone.

---

## The Problem

I had a Luckfox Pico (RV1103) board and zero idea how cross-compilation actually works under the hood.

> I've never manually built an execution environment for C/C++ before. So I did what any sane developer does — asked ChatGPT — and landed on this setup.

Turns out you can't just write C++ and run it on the board. You need something that knows *exactly* where the compiler, linker, and libraries live, builds the binary, ships it to the hardware, and runs it. That "something" is toolchain automation — in our case, CMake.

By the end of this, `make dev` will build, upload, and run your code on the board in one shot.

## What a Build System Actually Needs

Three things:

- a **compiler**
- **runtime libraries** (the `.so` files the board itself uses)
- **compile-time libraries** (headers + linkable stubs, aka the sysroot)

## Step 1 — Get the SDK

```bash
git clone https://github.com/LuckfoxTECH/luckfox-pico.git
```

This SDK is the source of everything — compilers, linkers, libraries, the works. Luckfox also ships a `build.sh` for baking your app straight into the OS image, but that's a deployment tool, not a dev loop. We want something faster to iterate with.

## Step 2 — Install the Toolchain

> A toolchain is just the set of programs — compilers, linkers, etc. — that RockChip built to target this SoC.

The compilers live here:

```
luckfox-pico/tools/linux/toolchain/arm-rockchip830-linux-uclibcgnueabihf/bin
```

> Poke around this folder — the "gibberish" filenames actually tell you a lot once you know what to look for.

Install it with the bundled script (optionally pointing it at a custom destination):

```bash
source env_install_toolchain.sh ~/.luckfox-toolchain
```

> Under the hood, "installation" is nothing fancier than copying this folder's contents to your destination so the rest of your system can find the tools.

## Step 3 — Find the Runtime Libraries

Programs on embedded Linux share compiled libraries (`.so` files) instead of each carrying its own copy. We need to know where they live so the linker can find them.

```bash
find luckfox-pico --name "*.so"
```

They're all under the **sysroot**, which is basically "everything the RV1103 has to offer":

```
luckfox-pico/tools/linux/toolchain/arm-rockchip830-linux-uclibcgnueabihf/arm-rockchip830-linux-uclibcgnueabihf/sysroot
```

> So really: toolchain automation is just telling the compiler and linker where these files are. *(Any ESP-IDF dev is nodding right now — this is old news to you.)*

## Step 4 — VS Code Setup

Two extensions:

- **clangd** — my C/C++ intelligence layer of choice *(the official C/C++ extension isn't on Open VSX, so clangd it is)*
- **CMake Tools**

> Fair warning: at some point clangd will throw `Version 'uclibcgnueabihf' in target triple 'arm-rockchip830-linux-uclibcgnueabihf' is invalid — clang(drv_triple_version_invalid)`. I spent 30 minutes trying to suppress it. Couldn't. **It's safe to ignore** as long as everything builds and the rest of your includes resolve correctly.

## Step 5 — Load the Environment

`env.sh` puts every path and tool name into your shell as variables:

```bash
#!/usr/bin/env bash
export TOOLCHAIN_ROOT="$HOME/.luckfox-pico-toolchain/arm-rockchip830-linux-uclibcgnueabihf"
export TARGET_TRIPLE="arm-rockchip830-linux-uclibcgnueabihf"
export SYSROOT="$TOOLCHAIN_ROOT/arm-rockchip830-linux-uclibcgnueabihf/sysroot"
export PATH="$TOOLCHAIN_ROOT/bin:$PATH"
export CC="${TARGET_TRIPLE}-gcc"
export CXX="${TARGET_TRIPLE}-g++"
export AR="${TARGET_TRIPLE}-ar"
export AS="${TARGET_TRIPLE}-as"
export LD="${TARGET_TRIPLE}-ld"
export NM="${TARGET_TRIPLE}-nm"
export STRIP="${TARGET_TRIPLE}-strip"
export OBJCOPY="${TARGET_TRIPLE}-objcopy"
export OBJDUMP="${TARGET_TRIPLE}-objdump"
export GDB="${TARGET_TRIPLE}-gdb"

echo "RV1103 Toolchain Loaded"
echo "CC=$CC"
echo "CXX=$CXX"
echo "SYSROOT=$SYSROOT"
```

> You only need to `source` this when *configuring* CMake, not on every build.

## Step 6 — CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.20)
project(RVFirmware)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_executable(
    RVFirmware
    src/main.cpp
    src/system_info.cpp
)

target_include_directories(
    RVFirmware
    PRIVATE
        include
)

target_link_libraries(
    RVFirmware
    pthread
)
```

## Step 7 — The Toolchain File

This is the file that actually tells CMake "hey, cross-compile for this weird little chip":

```cmake
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR arm)

set(TOOLCHAIN_ROOT $ENV{TOOLCHAIN_ROOT})
set(SYSROOT $ENV{SYSROOT})

set(CMAKE_SYSROOT ${SYSROOT})

set(CMAKE_C_COMPILER   ${TOOLCHAIN_ROOT}/bin/arm-rockchip830-linux-uclibcgnueabihf-gcc)
set(CMAKE_CXX_COMPILER ${TOOLCHAIN_ROOT}/bin/arm-rockchip830-linux-uclibcgnueabihf-g++)

set(CMAKE_C_FLAGS   "-march=armv7-a -mfpu=neon-vfpv4 -mfloat-abi=hard")
set(CMAKE_CXX_FLAGS "-march=armv7-a -mfpu=neon-vfpv4 -mfloat-abi=hard")

set(CMAKE_FIND_ROOT_PATH ${SYSROOT})
set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)
```

Project layout at this point:

```
.
├── build
├── cmake
│   └── rv1103-toolchain.cmake
├── CMakeLists.txt
├── commands.sh
├── env.sh
├── include
│   └── system_info.hpp
├── luckfox-pico
└── src
    ├── main.cpp
    └── system_info.cpp
```

## Step 8 — Build, Upload, Run (the manual way, once)

```bash
source env.sh
cmake -B build -DCMAKE_TOOLCHAIN_FILE=cmake/rv1103-toolchain.cmake
cmake --build build
```

The binary lands in `build/` under your project's name — `RVFirmware` here, since that's what's in `CMakeLists.txt`.

> If you don't know how to get an SSH shell onto the board yet, that's a separate rabbit hole I'll cover soon. Short version: `adb shell` gets you in *way* faster than the SSH-over-RNDIS route I originally fumbled through. *(I lost an embarrassing amount of time configuring RNDIS and IPs before realizing adb was sitting there the whole time. Learn from my mistakes.)*

Copy the binary over and run it:

```bash
scp build/RVFirmware root@172.32.0.93:/root/
ssh root@172.32.0.93 /root/RVFirmware
```

```
RV1103 Firmware Test
```

It works. 🎉

## Step 9 — Stop Typing All That

Nobody's memorizing that every day. Enter the `Makefile`:

```makefile
PROJECT := RVFirmware
BUILD_DIR := build

init:
 cmake -B $(BUILD_DIR) \
  -DCMAKE_TOOLCHAIN_FILE=cmake/rv1103-toolchain.cmake \
  -DCMAKE_EXPORT_COMPILE_COMMANDS=ON

build:
 cmake --build $(BUILD_DIR)

connect:
 sudo ip link set enp0s20f0u7u4 up
 sudo ip addr flush dev enp0s20f0u7u4
 sudo ip addr add 172.32.0.24/24 dev enp0s20f0u7u4

upload:
 scp $(BUILD_DIR)/$(PROJECT) root@172.32.0.93:/root/

run:
 ssh root@172.32.0.93 /root/$(PROJECT)

dev: build upload run
```

Now the whole loop is:

| Command | What it does |
| --- | --- |
| `make init` | Configure CMake with the toolchain file |
| `make build` | Compile and link |
| `make connect` | Bring up the USB RNDIS link |
| `make upload` | Ship the binary to the board |
| `make run` | SSH in and execute it |
| `make dev` | build → upload → run, all in one |

> Feel the immense power in your hands. 😈

---

## Grab the Template

I turned this whole setup into a ready-to-clone repo — toolchain file, CMakeLists, Makefile, VS Code + clangd config, the works:

**[github.com/bitnboson/rv1103-dev-template](https://github.com/bitnboson/rv1103-dev-template)**

Clone it, point `env.sh` at your toolchain, and you're building for the RV1103 in minutes instead of 4 hours.

*Next up: actually getting an SSH shell onto the board without losing an afternoon to RNDIS. Stay tuned.*
