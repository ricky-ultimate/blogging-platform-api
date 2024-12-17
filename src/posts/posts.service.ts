import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...data,
        tags: data.tags, // Prisma handles string array for tags
      },
    });
  }

  async getPostById(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  async getAllPosts(term?: string) {
    return this.prisma.post.findMany({
      where: term
        ? {
            OR: [
              { title: { contains: term, mode: 'insensitive' } },
              { content: { contains: term, mode: 'insensitive' } },
              { category: { contains: term, mode: 'insensitive' } },
            ],
          }
        : {},
    });
  }

  async updatePost(id: number, data: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    return this.prisma.post.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deletePost(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);

    await this.prisma.post.delete({ where: { id } });
    return;
  }
}
