import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CacheService } from 'src/cache/cache.service';
import { Demo } from './schemas/demo.schem';
import { Model } from 'mongoose';

@Injectable()
export class DemoService {
  constructor(
    @InjectModel(Demo.name) private demoModel: Model<Demo>,
    private cacheService: CacheService,
  ) {}

  async create(createDemoDto: CreateDemoDto) {
    const CreateDemo = new this.demoModel(createDemoDto);
    return CreateDemo.save();
  }

  async findAll() {
    try {
      const cachedData = await this.cacheService.get('demo_data');
      console.log({ cachedData });
      if (cachedData) {
        return { cachedData, fromCache: true };
      }

      const data = await this.demoModel
        .find({}, { _id: 1, name: 1, age: 1, email: 1 })
        .exec();

      await this.cacheService.set('demo_data', JSON.stringify(data));
      return { data, fromCache: false };
    } catch (e) {
      console.log(e);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} demo`;
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
