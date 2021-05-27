import { BaseEntity, Entity, PrimaryGeneratedColumn, Column,PrimaryColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class Campaign extends BaseEntity {


   
    @PrimaryGeneratedColumn('increment')
    tabid : number;


    @Column({nullable: false,})
    msisdn : number



    @Column({nullable: false,})
    nbr_transactions : number

    @Column({ nullable: false,})
    triggerId : string

    
    @Column({ nullable: false,})
    triggerDescription : string

    
    @Column({ nullable: true,})
    notificationtime: Date

    
    @Column({ nullable: true, default :"1"})
    trigger_attr_01 : string

    
    @Column({ nullable: true,})
    trigger_attr_02 : string

    
    @Column({ nullable: true,})
    trigger_attr_03 : string

    
    @Column({ nullable: true,})
    trigger_attr_04 : string

    
    @Column({nullable: true,})
    trigger_attr_05: string

    
    @Column({ nullable: true,})
    trigger_attr_06: string

    
    @Column({ nullable: true,})
    trigger_attr_07 : string

    
    @Column({ nullable: true,})
    trigger_attr_08: string

    @Column({ nullable: true,})
    trigger_attr_09: string

    @Column({ nullable: true,})
    trigger_attr_10: string

    @CreateDateColumn({ type: 'timestamp' })
    insertion_date: Date



    
}