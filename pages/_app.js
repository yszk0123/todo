import 'normalize.css';

import {
  createApp,
  injectReactAxe,
  injectWhyDidYouRender,
} from '../client/bootstrap';

injectWhyDidYouRender();
injectReactAxe();

const App = createApp();

export default App;
