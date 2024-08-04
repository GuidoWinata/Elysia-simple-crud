import { error } from 'elysia';
import { NotFoundError } from 'elysia';
import prisma from './client';

interface Posts {
  title: string;
  content: string;
}

export async function posts() {
  try {
    return await prisma.post.findMany({ orderBy: { createdAt: 'asc' } });
  } catch (e: unknown) {
    console.log(`Error getting post ${e}`);
  }
}

export async function findId(id: number) {
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!id) {
      return { message: 'Id tidak ditemukan' };
    }

    return post;
  } catch (e: unknown) {
    console.log(`Error getting post ${e}`);
  }
}

export async function createPost(options: Posts) {
  try {
    const { title, content } = options;
    return await prisma.post.create({ data: { title, content } });
  } catch (e: unknown) {
    console.error(`Cant create Posts because: ${e}`);
  }
}

export async function updatePost(id: number, options: Posts) {
  try {
    const { title, content } = options;

    return await prisma.post.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(content ? { content } : {}),
      },
    });
  } catch (e: unknown) {
    console.error(`Error update post: ${e}`);
  }
}

export async function deletePost(id: number) {
  try {
    const oke = await prisma.post.delete({ where: { id } });

    return {
      message: 'berhasil menghapus data',
      data: oke,
    };
  } catch (e: unknown) {
    console.error(`Enek sng salah ${e}`);
  }
}
