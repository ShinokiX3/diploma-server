/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CategoriesService } from './categories.service';
import { UsersService } from '../users/users.service';
import { AdminRoleGuard } from 'src/guards/roles-guard';
import { CreateCategoryDTO } from './dto';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly userService: UsersService,
    ) {}

    @Get('all')
    getAllCategories(@Req() request) {
        return this.categoriesService.getCategories();
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createCategory(@Body() dto: CreateCategoryDTO): Promise<any> {
        return this.categoriesService.createCategory(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Put('edit')
    editCategory(@Body() dto: CreateCategoryDTO): Promise<any> {
        return this.categoriesService.editCategory(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    deleteCategory(@Body() dto: CreateCategoryDTO): Promise<any> {
        return this.categoriesService.deleteCategory(dto);
    }
}
