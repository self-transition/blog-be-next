import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateOpenSourceInput } from './dtos/create-open-source.input'
import { UpdateOpenSourceInput } from './dtos/update-open-source.input'
import { OpenSourceModel } from './models/open-sources.models'
import { OpenSource } from './interfaces/open-sources.interface'
import { BatchDelete } from '../database/interfaces/batchDelete.interface'

@Injectable()
export class OpenSourcesService {
  constructor(
    @InjectModel('OpenSource')
    private readonly openSourceModel: Model<OpenSource>,
  ) {
    this.openSourceModel = openSourceModel
  }

  public async findAll(): Promise<OpenSourceModel[]> {
    return this.openSourceModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string): Promise<OpenSourceModel> {
    return this.openSourceModel.findById(id)
  }

  public async create(openSourceInput: CreateOpenSourceInput): Promise<OpenSourceModel> {
    return this.openSourceModel.create(openSourceInput)
  }

  public async update(openSourceInput: UpdateOpenSourceInput): Promise<OpenSourceModel> {
    const { id, ...rest } = openSourceInput
    return this.openSourceModel.findByIdAndUpdate(id, {
      rest,
    })
  }

  public async deleteOneById(id: string): Promise<OpenSourceModel> {
    return this.openSourceModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]): Promise<BatchDelete> {
    return this.openSourceModel.remove({
      _id: { $in: ids },
    })
  }
}
