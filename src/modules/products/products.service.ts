import { CategoriesService } from '../categories/categories.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './schemas/products.schema';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { Kind, KindDocument } from './schemas/kind.schema';
import {
    Manufacturer,
    ManufacturerDocument,
} from './schemas/manufacturer.schema';
import { Packing, PackingDocument } from './schemas/packing.schema';
import { Strength, StrengthDocument } from './schemas/strength.schema';
import { Capacity, CapacityDocument } from './schemas/сapacity.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductAttributeDTO, CreateProductDTO } from './dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products.name)
        private productsModel: Model<ProductsDocument>,
        @InjectModel(Brand.name)
        private brandModel: Model<BrandDocument>,
        @InjectModel(Kind.name)
        private kindModel: Model<KindDocument>,
        @InjectModel(Manufacturer.name)
        private manufacturerModel: Model<ManufacturerDocument>,
        @InjectModel(Packing.name)
        private packingModel: Model<PackingDocument>,
        @InjectModel(Strength.name)
        private strengthModel: Model<StrengthDocument>,
        @InjectModel(Capacity.name)
        private capacityModel: Model<CapacityDocument>,
        private readonly tokenService: TokenService,
        private readonly categoriesService: CategoriesService,
        private fileService: FileService,
    ) {}

    // Product

    async getAllProducts(): Promise<any> {
        try {
            const products = await this.productsModel.find();
            return products;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async getProductsByTerm(dto: any): Promise<any> {
        try {
            const products = await this.productsModel.find({
                title: { $regex: new RegExp(dto.term, 'i') },
            });

            if (products.length > 0) {
                return products;
            }
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async getProductById(dto: any): Promise<any> {
        try {
            const product = await this.productsModel.find({ _id: dto.id });

            const brand = await this.brandModel.find({
                _id: product[0].brand,
            });

            const strength = await this.strengthModel.find({
                _id: product[0].strength,
            });

            const capacity = await this.capacityModel.find({
                _id: product[0].capacity,
            });

            const kind = await this.kindModel.find({
                _id: product[0].kind,
            });

            const manufacturer = await this.manufacturerModel.find({
                _id: product[0].manufacturer,
            });

            const packing = await this.packingModel.find({
                _id: product[0].packing,
            });

            if (product.length > 0) {
                return [
                    ...product,
                    { kind, strength, packing, manufacturer, capacity, brand },
                ];
            }
            return {};
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async getProductsByCategory(dto: any): Promise<any> {
        try {
            const product = await this.productsModel.find({ category: dto.id });
            if (product.length > 0) {
                return product;
            }
            return {};
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async createProduct(dto: CreateProductDTO, picture): Promise<any> {
        try {
            const product = await this.productsModel.find({
                title: dto.title,
            });

            if (product.length < 1) {
                const picturePath = this.fileService.createFile(
                    FileType.IMAGE,
                    picture,
                );

                const product = this.productsModel.create({
                    ...dto,
                    picture: picturePath,
                });

                return product;
            }
            return { error: '', message: 'Product already exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async editProduct(dto: any): Promise<any> {
        try {
            const product = await this.productsModel.find();
            return product;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async deleteProduct(dto: any): Promise<any> {
        try {
            const product = await this.productsModel.find({ _id: dto.id });
            if (product.length === 1) {
                const product = this.productsModel.deleteOne({
                    _id: dto.id,
                });

                return product;
            }
            return { error: '', message: 'Product doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    // Brand

    async getAllBrands(): Promise<any> {
        try {
            const brand = await this.brandModel.find();
            return brand;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async createBrand(dto: CreateProductAttributeDTO): Promise<any> {
        try {
            const brand = await this.brandModel.find({
                value: dto.value,
            });

            if (brand.length < 1) {
                const brand = this.brandModel.create({
                    ...dto,
                });

                return brand;
            }
            return { error: '', message: 'Brand already exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async editBrand(dto: any): Promise<any> {
        try {
            const brand = await this.brandModel.find();
            return brand;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async deleteBrand(dto: any): Promise<any> {
        try {
            const brand = await this.brandModel.find({ _id: dto.id });
            if (brand.length === 1) {
                const brand = this.brandModel.deleteOne({
                    _id: dto.id,
                });
                return brand;
            }
            return { error: '', message: 'Brand doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    // Kind

    async getAllKinds(): Promise<any> {
        try {
            const kinds = await this.kindModel.find();
            return kinds;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async createKind(dto: CreateProductAttributeDTO): Promise<any> {
        try {
            const kind = await this.kindModel.find({
                value: dto.value,
            });

            if (kind.length < 1) {
                const kind = this.kindModel.create({
                    ...dto,
                });

                return kind;
            }
            return { error: '', message: 'Kind already exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async editKind(dto: any): Promise<any> {
        try {
            const kind = await this.kindModel.find();
            return kind;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async deleteKind(dto: any): Promise<any> {
        try {
            const kind = await this.kindModel.find({ _id: dto.id });
            if (kind.length === 1) {
                const kind = this.kindModel.deleteOne({
                    _id: dto.id,
                });
                return kind;
            }
            return { error: '', message: 'Kind doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    // Manufacturer

    async getAllManufacturers(): Promise<any> {
        try {
            const manufacturers = await this.manufacturerModel.find();
            return manufacturers;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async createManufacturer(dto: CreateProductAttributeDTO): Promise<any> {
        try {
            const manufacturer = await this.manufacturerModel.find({
                value: dto.value,
            });

            if (manufacturer.length < 1) {
                const manufacturer = this.manufacturerModel.create({
                    ...dto,
                });

                return manufacturer;
            }
            return { error: '', message: 'Manufacturer already exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async editManufacturer(dto: any): Promise<any> {
        try {
            const manufacturer = await this.manufacturerModel.find();
            return manufacturer;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async deleteManufacturer(dto: any): Promise<any> {
        try {
            const manufacturer = await this.manufacturerModel.find({
                _id: dto.id,
            });
            if (manufacturer.length === 1) {
                const manufacturer = this.manufacturerModel.deleteOne({
                    _id: dto.id,
                });
                return manufacturer;
            }
            return { error: '', message: 'Manufacturer doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    // Packing

    async getAllPackings(): Promise<any> {
        try {
            const packings = await this.packingModel.find();
            return packings;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async createPacking(dto: CreateProductAttributeDTO): Promise<any> {
        try {
            const packing = await this.packingModel.find({
                value: dto.value,
            });

            if (packing.length < 1) {
                const packing = this.packingModel.create({
                    ...dto,
                });

                return packing;
            }
            return { error: '', message: 'Packing already exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async editPacking(dto: any): Promise<any> {
        try {
            const packing = await this.packingModel.find();
            return packing;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async deletePacking(dto: any): Promise<any> {
        try {
            const packing = await this.packingModel.find({
                _id: dto.id,
            });
            if (packing.length === 1) {
                const packing = this.packingModel.deleteOne({
                    _id: dto.id,
                });
                return packing;
            }
            return { error: '', message: 'Packing doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    // Strength

    async getAllStrength(): Promise<any> {
        try {
            const strength = await this.strengthModel.find();
            return strength;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async createStrength(dto: CreateProductAttributeDTO): Promise<any> {
        try {
            const strength = await this.strengthModel.find({
                value: dto.value,
            });

            if (strength.length < 1) {
                const strength = this.strengthModel.create({
                    ...dto,
                });

                return strength;
            }
            return { error: '', message: 'Strength already exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async editStrength(dto: any): Promise<any> {
        try {
            const strength = await this.strengthModel.find();
            return strength;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async deleteStrength(dto: any): Promise<any> {
        try {
            const strength = await this.strengthModel.find({
                _id: dto.id,
            });
            if (strength.length === 1) {
                const strength = this.strengthModel.deleteOne({
                    _id: dto.id,
                });
                return strength;
            }
            return { error: '', message: 'Strength doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    // Capacity

    async getAllCapacities(): Promise<any> {
        try {
            const capacites = await this.capacityModel.find();
            return capacites;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async createCapacity(dto: CreateProductAttributeDTO): Promise<any> {
        try {
            const capacity = await this.capacityModel.find({
                value: dto.value,
            });

            if (capacity.length < 1) {
                const capacity = this.capacityModel.create({
                    ...dto,
                });

                return capacity;
            }
            return { error: '', message: 'Capacity already exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async editCapacity(dto: any): Promise<any> {
        try {
            const capacity = await this.capacityModel.find();
            return capacity;
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    async deleteCapacity(dto: any): Promise<any> {
        try {
            const capacity = await this.capacityModel.find({
                _id: dto.id,
            });
            if (capacity.length === 1) {
                const capacity = this.capacityModel.deleteOne({
                    _id: dto.id,
                });
                return capacity;
            }
            return { error: '', message: 'Capacity doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }

    // All attributes

    async getAllAttributes(): Promise<any> {
        try {
            const brand = await this.brandModel.find();
            const kind = await this.kindModel.find();
            const manufacturer = await this.manufacturerModel.find();
            const packing = await this.packingModel.find();
            const capacities = await this.capacityModel.find();
            const strengths = await this.strengthModel.find();

            return {
                brand,
                kind,
                manufacturer,
                packing,
                capacities,
                strengths,
            };
        } catch (error) {
            throw new BadRequestException('error');
        }
    }

    // Main page

    async getProductsPreview(): Promise<any> {
        try {
            const categories = await this.categoriesService.getCategories();
            const results = (
                await Promise.all(
                    categories.map((category) => {
                        return this.productsModel.find({
                            category: category._id,
                        });
                    }),
                )
            ).map((result) => result.slice(0, 5));

            if (results.length > 0) {
                return results;
            }
            return { error: '', message: 'Products doesn`t exist' };
        } catch (e) {
            throw new BadRequestException('error');
        }
    }
}
