import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  post: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PostsService', () => {
  let service: PostsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get(PrismaService);
  });

  it('should create a new post', async () => {
    const dto = {
      title: 'Test Post',
      content: 'This is a test post',
      category: 'Test',
      tags: ['nestjs', 'testing'],
    };

    const result = {
      id: 1,
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prisma.post.create.mockResolvedValue(result);

    expect(await service.createPost(dto)).toEqual(result);
    expect(prisma.post.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should throw NotFoundException when post not found', async () => {
    prisma.post.findUnique.mockResolvedValue(null);

    await expect(service.getPostById(1)).rejects.toThrow(
      new NotFoundException(`Post with ID 1 not found`),
    );
  });

  it('should update a post', async () => {
    const dto = { title: 'Updated Post' };
    const result = {
      id: 1,
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prisma.post.findUnique.mockResolvedValue(result);
    prisma.post.update.mockResolvedValue(result);

    expect(await service.updatePost(1, dto)).toEqual(result);
    expect(prisma.post.update).toHaveBeenCalled();
  });

  it('should delete a post', async () => {
    prisma.post.findUnique.mockResolvedValue({ id: 1 });
    prisma.post.delete.mockResolvedValue({ id: 1 });

    expect(await service.deletePost(1)).toBeUndefined();
    expect(prisma.post.delete).toHaveBeenCalled();
  });
});
