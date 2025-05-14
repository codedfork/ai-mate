import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Chat {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    userId: string;

    @Column()
    sessionId: string;

    @Column()
    role: 'user' | 'assistant';

    @Column()
    message: string;

    @Column({ type: 'timestamp', default: () => new Date() })
    createdAt: Date;
}
