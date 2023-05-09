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
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { AdminRoleGuard } from '../../guards/roles-guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDTO } from '../categories/dto';
import { CreateProductDTO } from './dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // Product

    @Get('all')
    getAllProducts(@Req() request) {
        return this.productsService.getAllProducts();
    }

    // @Post()
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'picture', maxCount: 1 },
    //     { name: 'audio', maxCount: 1 },
    // ]))
    // create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    //     const {picture, audio} = files
    //     return this.trackService.create(dto, picture[0], audio[0]);
    // }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
    createProduct(
        @UploadedFiles() files,
        @Body() dto: CreateProductDTO,
    ): Promise<any> {
        const { picture } = files;

        return this.productsService.createProduct(dto, picture);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Put('edit')
    editProduct(@Body() dto: any): Promise<any> {
        return this.productsService.editProduct(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    deleteProduct(@Body() dto: any): Promise<any> {
        return this.productsService.deleteProduct(dto);
    }
}
