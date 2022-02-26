import { Controller, Get, Param, Post, Delete, Patch, Body, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entitiy';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieServices: MoviesService) { }

    @Get()
    getAll(): Movie[] {
        return this.movieServices.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number): Movie {
        return this.movieServices.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.movieServices.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: number) {
        return this.movieServices.deleteOne(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        return this.movieServices.update(movieId, updateData);
    }
}