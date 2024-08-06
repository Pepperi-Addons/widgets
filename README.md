# Widgets

## High Level
The widgets addon was created for the following reason:
Allow customers to

---

## Releases
| Version | Description | Migration |
|-------- |------------ |---------- |
| 1.0 | Addon phased version - includes basic functionallity according to product requirements | - |

---

## Deployment
After a PR is merged into a release branch a version will be published.

---

## Debugging
- client-side - addon this to your URL while the block is running and this addon client side is running locally:
&devBlocks=%5B%5B"BlockComponent","http:%2F%2Flocalhost:4400%2Ffile_c62f8195-4eeb-4231-a63e-6e53d90b5f96.js"%5D%5D
(Note the localhost you are running on locally)

- cpi-side - `addon-cpi/on_load` - run the pepperi app locally and call this endpoint on cpi-side with the correct interface in order to debug the on_load function 

### Local specific
- None

### Online specific
- Log groups: 
  - `/aws/lambda/AddonsExecuteJavaScriptLambdaAsync` / `dwa` - async jobs logs.
  - `CPIService`/ `CPIManagerService` - CPI side logs

---

## Testing
This addon does not require any tests (so far).

---

## Infra
- Client-side - Page-builder (runs as a page block)
- Cpi-side - CPINode (in charge of the flows methods)

### Run time:
- Standart pepperi addons runtime

### External
- Note some widgets are not supported:
i.Widgets that include more than one HTML element
ii.widgets that do not support loading during runtime

---

## Dependencies

| Addon | Usage |
|-------- |------------ |
| [Pages](https://github.com/Pepperi-Addons/page-builder) | Infrastructure |

---

## APIs
- Currently no relevant server side API's are exposed

---

## Limitations
- The widget addon can support only one widgets per page, if there is more than one widget unexpected behavior will occur (the two widgets will clash)
---

## Known issues
- On devices it works only on homescreen (as soon as you navigate away it will disappear,devices related issue not related to this addon)
- The block has 2.5rem height (instead of none,pages bug,default height for a block),it should be configured as the bottom block on the page for UI purposes.
---

## Usage
- The user installs the addon
- The user configures a block on type "Wigets" on a page -> inputs the script tag that the inserted widget is using
- Save the page (make sure its published)
- Configure the slug for it -> sync
- Go to homescreen -> widget should be available
- Path value example:

- Lets say we have an object:
const Object = {
  Controls:['right','left'],
  TimeStamps: {
    ModificationDate:'',
    CreationDate:''
  }
}

- In order to get the value for the second place of controls: Object.Controls.[1]
- In order to get the value for the ModificationDate: Object.TimeStamps.ModificationDate

- This logic is modeled after ['json-path'] (https://www.npmjs.com/package/jsonpath) according to product requirements 

## Block
- The block itself has no UI
- The block's job is to append the script into the body of the current html view (device/web)
- Note it requires testing as some widgets are not supported as we mentioned earlier

## Editor
- Simple editor with a string input, and a flows configuration button
