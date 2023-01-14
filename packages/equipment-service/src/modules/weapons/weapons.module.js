"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WeaponsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var _1 = require(".");
var entities_1 = require("./entities");
var weapons_repository_1 = require("./weapons.repository");
var WeaponsModule = /** @class */ (function () {
    function WeaponsModule() {
    }
    WeaponsModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Weapon])],
            controllers: [_1.WeaponsController],
            providers: [
                _1.WeaponService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(entities_1.Weapon),
                    inject: [(0, typeorm_1.getDataSourceToken)()],
                    useFactory: function (dataSource) {
                        // Override default repository for Task with a custom one
                        return dataSource
                            .getRepository(entities_1.Weapon)
                            .extend(weapons_repository_1.customWeaponRepositoryMethods);
                    }
                }
            ]
        })
    ], WeaponsModule);
    return WeaponsModule;
}());
exports.WeaponsModule = WeaponsModule;
