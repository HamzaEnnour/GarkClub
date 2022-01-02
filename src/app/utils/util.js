import { environment } from 'src/environments/environment';


export const getThemeColor = () => {
    let color = environment.defaultColor;
    try {
        color = localStorage.getItem(environment.themeColorStorageKey) || environment.defaultColor;
        console.log(color);
    } catch (error) {
        console.log(">>>> src/app/utils/util.js : getThemeColor -> error", error)
        color = environment.defaultColor
    }
    console.log(color);
    return color;
}
export const setThemeColor = (color) => {
    try {
        if(localStorage.getItem(environment.themeColorStorageKey) == environment.darkTheme){
            localStorage.setItem(environment.themeColorStorageKey, environment.darkTheme);
        }
        // if (color) {
        //     localStorage.setItem(environment.themeColorStorageKey, color);
        //     console.log(color);
        // } 
        else {
            localStorage.setItem(environment.themeColorStorageKey, environment.defaultColor);
            // localStorage.removeItem(environment.themeColorStorageKey)
        }
    } catch (error) {
        console.log(">>>> src/app/utils/util.js : setThemeColor -> error", error)
    }
}
export const getThemeRadius = () => {
    let radius = 'rounded';
    try {
        radius = localStorage.getItem(environment.themeRadiusStorageKey) || 'rounded';
    } catch (error) {
        //console.log(">>>> src/app/utils/util.js : getThemeRadius -> error", error)
        radius = 'rounded'
    }
    return radius;
}
export const setThemeRadius = (radius) => {
    try {
        localStorage.setItem(environment.themeRadiusStorageKey, radius);
    } catch (error) {
        //console.log(">>>> src/app/utils/util.js : setThemeRadius -> error", error)
    }
}

export const getThemeLang = () => {
    let lang = 'en-US';
    try {
        lang = localStorage.getItem('theme_lang') || 'en-US';
    } catch (error) {
        //console.log(">>>> src/app/utils/util.js : getThemeLang -> error", error)
        lang = 'en-US'
    }
    return lang;
}
export const setThemeLang = (lang) => {
    try {
        localStorage.setItem('theme_lang', lang);
    } catch (error) {
        //console.log(">>>> src/app/utils/util.js : setThemeLang -> error", lang)
    }
}