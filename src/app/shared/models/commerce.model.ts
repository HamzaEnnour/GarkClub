import { SocialMedia } from "./socialMedia.model";
import { PopUp } from "./popup.model";
import { Menu } from "./menu.model";


export interface Commerce {
    id: string;
    commerceName: string;
    menu: Menu;
    language: string;
    popUpList: PopUp[];
    socialMediaList: SocialMedia[];
}


