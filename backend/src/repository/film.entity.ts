import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'real', nullable: true })
  rating: number;

  @Column({ nullable: true })
  director: string;

  @Column('text', { array: true, default: () => "'{}'" })
  tags: string[];

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
