## `iconography-optimize`

> designed for lint-staged usage with sensible defaults

### Overview

Automatically optimize images on submission

## Installation
```
npm i --save-dev iconography-optimize
```

## Usage

1. ```iconography-optimize 1.png 2.png```, Replacement of original position
2. ```iconography-optimize -T ./images ```, Replace the original location in the folder
3. ```iconography-optimize -T ./images -O ./newImages/```, Output to new directory
4. ```iconography-optimize -O ./newImages/ 1.png 2.png```, Output to new directory
5. use width lint-staged

```
"lint-staged": {
    "*.{png,jpg,webp}": ["iconography-optimize", "git add"]
}
```
> Other formats are not supported at the moment（gif）, Please change JPEG to jpg 


## License

MIT