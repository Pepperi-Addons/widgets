# [addon name] Architecture

## Overview

- This addon is using the pages infrastructure for its runtime and usage
- Most of the logic is being implemented on the client side
- Pages editor is needed in order to configure the block and widget

---

## Infrastructure

| Addon                                                   | Usage          |
| ------------------------------------------------------- | -------------- |
| [Pages](https://github.com/Pepperi-Addons/page-builder) | Infrastructure |

---

## Data Model

- None

---

## PNS Usage

- None

---

## Relations

| Addon                                                   | Usage          |
| ------------------------------------------------------- | -------------- |
| [Pages](https://github.com/Pepperi-Addons/page-builder) | Infrastructure |

---

#### High Level

- In essence this addon inejcts a script into the body of the webapp/device homescreen
- Thus script tag then runs its own logic according to the provider and loads the widget into the UI
- We support only script-tagged widgets (I.E <script/>...), some widgets require elaborate intjections into body/head that can cause issues with the app itself and security
- The block is configured via pages editor and loaded with the other blocks during runtime



