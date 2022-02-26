import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';


describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // unit test
  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: "test movie",
        year: 2022,
        generes: ["test"]
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: "test movie",
        year: 2022,
        generes: ["test"]
      });

      const beforeMovie = service.getAll().length;
      service.deleteOne(1);
      const afterMovie = service.getAll().length;

      expect(afterMovie).toBeLessThan(beforeMovie);
    });

    it('should throw 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "test movie",
        year: 2022,
        generes: ["test"]
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: "test movie",
        year: 2022,
        generes: ["test"]
      });
      service.update(1, { title: "update movie" });

      const movie = service.getOne(1);
      expect(movie.title).toEqual("update movie");
    });

    it('should throw 404 error', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
