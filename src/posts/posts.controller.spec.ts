import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { NotFoundException } from '@nestjs/common';

const mockPostsService = {
  createPost: jest.fn(),
  getPostById: jest.fn(),
  getAllPosts: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
};

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: mockPostsService }],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should create a post', async () => {
    const dto: CreatePostDto = {
      title: 'Test Post',
      content: 'Test Content',
      category: 'Test Category',
      tags: ['test'],
    };

    const result = {
      id: 1,
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockPostsService.createPost.mockResolvedValue(result);

    expect(await controller.createPost(dto)).toEqual(result);
    expect(mockPostsService.createPost).toHaveBeenCalledWith(dto);
  });

  it('should return a post by ID', async () => {
    const result = { id: 1, title: 'Test Post' };
    mockPostsService.getPostById.mockResolvedValue(result);

    expect(await controller.getPostById(1)).toEqual(result);
    expect(mockPostsService.getPostById).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when post not found', async () => {
    mockPostsService.getPostById.mockRejectedValue(
      new NotFoundException('Post not found'),
    );

    await expect(controller.getPostById(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a post', async () => {
    const dto: UpdatePostDto = { title: 'Updated Post' };
    const result = { id: 1, ...dto };

    mockPostsService.updatePost.mockResolvedValue(result);

    expect(await controller.updatePost(1, dto)).toEqual(result);
    expect(mockPostsService.updatePost).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a post', async () => {
    mockPostsService.deletePost.mockResolvedValue(undefined);

    expect(await controller.deletePost(1)).toEqual({
      message: 'Post with ID 1 deleted successfully',
    });
    expect(mockPostsService.deletePost).toHaveBeenCalledWith(1);
  });
});
