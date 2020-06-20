import { handlers } from './_lib/handlers';

export default process.env.NODE_ENV !== 'production'
  ? handlers.playground
  : () => {
      throw new Error('playground is not available in production');
    };
