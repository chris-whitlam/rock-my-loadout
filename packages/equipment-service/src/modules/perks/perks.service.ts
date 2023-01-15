import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPerksDto } from './dtos';

import { Perk, PerkPackage } from './entities';

@Injectable()
export class PerksService {
  constructor(
    @InjectRepository(Perk)
    private readonly perksRepository: Repository<Perk>,
    @InjectRepository(PerkPackage)
    private readonly perkPackagesRepository: Repository<PerkPackage>
  ) {}

  getAllPerks(getPerksDto: GetPerksDto): Promise<Perk[]> {
    return this.perksRepository.find({
      where: getPerksDto,
      relations: {
        perkPackages: false
      }
    });
  }

  getPerkByUUID(uuid: string): Promise<Perk> {
    return this.perksRepository.findOne({
      relations: {
        perkPackages: true
      },
      where: { uuid }
    });
  }

  getAllPerkPackages(): Promise<PerkPackage[]> {
    return this.perkPackagesRepository.find({
      relations: {
        perks: true
      }
    });
  }

  getPerkPackageByUUID(uuid: string): Promise<PerkPackage> {
    return this.perkPackagesRepository.findOne({
      relations: {
        perks: true
      },
      where: {
        uuid
      }
    });
  }
}
