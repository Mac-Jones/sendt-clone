# `Sendt Mobile`

## Getting started

To start, you `cd` to project and `expo install` or `npm install`

### Project Layout

- [`src`](/src) This is where you can find all the modules which are linked to the development modules. You'll do most of your development in here.
  - [`apps`](/src/app) This is where we setup routing **https://docs.expo.dev/routing/introduction/**
  - [`components`](/src/components) Following the atomic design principles **https://atomicdesign.bradfrost.com/**
  - [`constants`](/src/constants) This is where all constant variables to store
  - [`hooks`](/src/hooks) This is where we put all the custom hooks we created.
  - [`themes`](/src/themes) All related to colors, fonts, metrics, styles, etc.


> **Note**  
> You can create an additional folders if needed be like `helpers`, `utils`, etc.

### Responsive Design

We have created a `metric.js` file under themes. Use this for setting styles such as height, width, etc.

| Function           | Usage                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `verticalScale`    | height, marginTop, marginBottom, marginVertical, lineHeight, paddingTop, paddingBottom, paddingVertical, likewise. |
| `horizontalScale`  | width, marginLeft, marinRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal, likewise.           |
| `moderateScale`    | fontSize, borderRadius, likewise.                                                                                  |