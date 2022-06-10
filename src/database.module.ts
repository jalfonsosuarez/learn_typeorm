import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigType} from '@nestjs/config';
import config  from './config';

@Global()
@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (
            configService: ConfigType<typeof config>
        ) => {
            const {host, name, password, user} = configService.database;
            return {
                type: 'postgres',
                host,
                database: name,
                password,
                username: user,
                port: 5432,
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: true
            }
        },
        inject: [config.KEY]
    })],
})

export class DatabaseModule{}