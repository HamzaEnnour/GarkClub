import { environment } from 'src/environments/environment';
const adminRoot = environment.adminRoot;
export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
  onlyDesktop?: boolean;
  visible?: boolean;
}

const data: IMenuItem[] = [
  {
    icon: 'flaticon-speedometer',
    label: 'Tableau de bord',
    to: `${adminRoot}`,
    onlyDesktop: false,
    visible: true
  },
  {
    icon: 'flaticon-calendar',
    label: 'Evènements',
    to: `${adminRoot}`,
    onlyDesktop: false,
    visible: true
  },
  {
    icon: 'flaticon1-football-jersey',
    label: 'Matériels',
    to: `${adminRoot}`,
    subs: [],
    onlyDesktop: false,
    visible: true
  },
  {
    icon: 'flaticon-clipboard',
    label: 'Groups',
    to: `${adminRoot}`,
    subs: [],
    onlyDesktop: false,
    visible: true
  },
  {
    icon: 'flaticon-accounting',
    label: 'Comptabilité',
    to: `${adminRoot}`,
    subs: [],
    onlyDesktop: false,
    visible: true
  },
  {
    icon: 'simple-icon-settings',
    label: 'Compte',
    to: `${adminRoot}/compte`,
    onlyDesktop: false,
    visible: false
  },
];
export default data;
