import { BaseEntity, Entity, PrimaryGeneratedColumn, Column,PrimaryColumn } from 'typeorm';


@Entity({name : 'tbl_stg_imp_trigger_2018_03_23'})
export class Trigger extends BaseEntity {


@PrimaryGeneratedColumn('increment')
tabid : number;



@Column({unique: true, nullable: false,})
msisdn : string



@Column({unique: false, nullable: false,type: 'datetime'})
incomingTime : Date;



@Column({unique: false, nullable: false,})
triggerId:  string;



@Column({unique: false, nullable: false,})
isProcessed:  string;



@Column({unique: false, nullable: false,})
triggerDescription:  string ;




@Column({unique: false, nullable: true,})
AFK_TRIGGERID_MSISDN?:  string ;



@Column({unique: false, nullable: true,})
aggregateId?:  string ;



@Column({unique: false, nullable: true,})
notificationTime?:  string ;



@Column({unique: false, nullable: true,})
id?:  string ;



@Column({unique: false, nullable: true,})
TRIGGER_ATTR_01?:  string ;



@Column({unique: false, nullable: true,})
TRIGGER_ATTR_02?:  string ;



@Column({unique: false, nullable: true,})
TRIGGER_ATTR_03?:  string ;



@Column({unique: false, nullable: true,})
TRIGGER_ATTR_04?:  string ;



@Column({unique: false, nullable: true,})
TRIGGER_ATTR_05?:  string ;



@Column({unique: false, nullable: true,})
TRIGGER_ATTR_06?:  string ;



@Column({unique: false, nullable: true,})
TRIGGER_ATTR_07?:  string ;



@Column({unique: false, nullable: true,})
TRIGGER_ATTR_08?:  string ;



@Column({unique: false, nullable: true,})
TRIGGER_ATTR_09?:  string ;




@Column({unique: false, nullable: true,})
TRIGGER_ATTR_10?:  string ;










}