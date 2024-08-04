import { Elysia, t } from 'elysia';
import { posts, deletePost, findId, updatePost, createPost } from '../db/handlers';

const router = new Elysia({ prefix: '/posts' })
  .get('/', () => posts())
  .get('/:id', ({ params: { id } }) => findId(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post('/', ({ body }) => createPost(body), {
    body: t.Object({
      title: t.String(),
      content: t.String(),
    }),
  })
  .patch('/:id', ({ params: { id }, body }) => updatePost(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object({
      title: t.String(),
      content: t.String(),
    }),
  })
  .delete('/:id', ({ params: { id } }) => deletePost(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default router;
