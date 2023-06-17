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
import { CreateProductDTO } from './dto';

// @Post()
// @UseInterceptors(FileFieldsInterceptor([
//     { name: 'picture', maxCount: 1 },
//     { name: 'audio', maxCount: 1 },
// ]))
// create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
//     const {picture, audio} = files
//     return this.trackService.create(dto, picture[0], audio[0]);
// }

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // Product

    @Get('all')
    getAllProducts(@Req() request) {
        return this.productsService.getAllProducts();
    }

    @Post('term')
    getProductsByTerm(@Body() dto: any): Promise<any> {
        return this.productsService.getProductsByTerm(dto);
    }

    @Post('id')
    getProductById(@Body() dto: any): Promise<any> {
        return this.productsService.getProductById(dto);
    }

    @Post('category')
    getProductByCategory(@Body() dto: any): Promise<any> {
        return this.productsService.getProductsByCategory(dto);
    }

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

    // Brand

    @Get('brand/all')
    getAllBrands(@Req() request) {
        return this.productsService.getAllBrands();
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post('brand/create')
    createBrand(@Body() dto: any): Promise<any> {
        return this.productsService.createBrand(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Put('brand/edit')
    editBrand(@Body() dto: any): Promise<any> {
        return this.productsService.editBrand(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('brand/delete')
    deleteBrand(@Body() dto: any): Promise<any> {
        return this.productsService.deleteBrand(dto);
    }

    // Kind

    @Get('kind/all')
    getAllKinds(@Req() request) {
        return this.productsService.getAllKinds();
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post('kind/create')
    createKind(@Body() dto: any): Promise<any> {
        return this.productsService.createKind(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Put('kind/edit')
    editKind(@Body() dto: any): Promise<any> {
        return this.productsService.editKind(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('kind/delete')
    deleteKind(@Body() dto: any): Promise<any> {
        return this.productsService.deleteKind(dto);
    }

    // Manufacturer

    @Get('manufacturer/all')
    getAllManufacturers(@Req() request) {
        return this.productsService.getAllManufacturers();
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post('manufacturer/create')
    createManufacturer(@Body() dto: any): Promise<any> {
        return this.productsService.createManufacturer(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Put('manufacturer/edit')
    editManufacturer(@Body() dto: any): Promise<any> {
        return this.productsService.editManufacturer(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('manufacturer/delete')
    deleteManufacturer(@Body() dto: any): Promise<any> {
        return this.productsService.deleteManufacturer(dto);
    }

    // Packing

    @Get('packing/all')
    getAllPackings(@Req() request) {
        return this.productsService.getAllPackings();
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post('packing/create')
    createPacking(@Body() dto: any): Promise<any> {
        return this.productsService.createPacking(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Put('packing/edit')
    editPacking(@Body() dto: any): Promise<any> {
        return this.productsService.editPacking(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('packing/delete')
    deletePacking(@Body() dto: any): Promise<any> {
        return this.productsService.deletePacking(dto);
    }

    // Strength

    @Get('strength/all')
    getAllStrength(@Req() request) {
        return this.productsService.getAllStrength();
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post('strength/create')
    createStrength(@Body() dto: any): Promise<any> {
        return this.productsService.createStrength(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Put('strength/edit')
    editStrength(@Body() dto: any): Promise<any> {
        return this.productsService.editStrength(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('strength/delete')
    deleteStrength(@Body() dto: any): Promise<any> {
        return this.productsService.deleteStrength(dto);
    }

    // Capacity

    @Get('capacity/all')
    getAllCapacities(@Req() request) {
        return this.productsService.getAllCapacities();
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post('capacity/create')
    createCapacity(@Body() dto: any): Promise<any> {
        return this.productsService.createCapacity(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Put('capacity/edit')
    editCapacity(@Body() dto: any): Promise<any> {
        return this.productsService.editCapacity(dto);
    }

    @UseGuards(AdminRoleGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('capacity/delete')
    deleteCapacity(@Body() dto: any): Promise<any> {
        return this.productsService.deleteCapacity(dto);
    }

    // Attributes

    @Get('attributes/all')
    getAllAttributes(@Req() request) {
        return this.productsService.getAllAttributes();
    }

    // Main page

    @Get('/preview')
    getProductsPreview(@Req() request) {
        return this.productsService.getProductsPreview();
    }

    // Chart

    @Get('/chart/all')
    getProductsServiceChartInfo(@Req() request) {
        return this.productsService.getProductsServiceChartInfo(request);
    }
}
