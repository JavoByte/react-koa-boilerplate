import Loadable from 'react-loadable';
import PageLoader from '~pages/Loader';

export default loader => Loadable({
  loader,
  loading: PageLoader,
});
