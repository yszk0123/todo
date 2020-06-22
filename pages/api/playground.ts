import { handlers } from '../../server/handlers';

export default process.env.NODE_ENV !== 'production'
  ? handlers.playground
  : () => {
      throw new Error('playground is not available in production');
    };
