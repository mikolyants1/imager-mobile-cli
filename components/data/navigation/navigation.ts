import { INavigation } from './types';
import InboxIcon from '@expo/vector-icons/';
import BrushIcon from '@expo/vector-icons/';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import LogoutIcon from '@expo/vector-icons/';
import PaintIcon from '@mui/icons-material/ColorLens';

export const createNavigateData = (isPremium: boolean, isMobile: boolean): INavigation[] => {
  const routes: INavigation[] = [
    {
      path: '/home/retouche',
      name: 'Ретушь',
      Icon: BrushIcon,
    },
    {
      path: '/home/edit',
      name: 'Редактирование',
      Icon: PaintIcon,
    },
  ];
  if (!isMobile) {
    routes.push(
      {
        path: '/home/format',
        name: 'Изменить формат',
        Icon: InboxIcon,
      },
      {
        path: '/home/improve',
        name: 'Улучшить качество',
        Icon: AutoFixHighIcon,
      },
    );
  }
  if (isPremium) {
    routes.push({
        path: '/',
        name: 'Выйти',
        Icon: LogoutIcon,
      });
  }
  return routes;
};
