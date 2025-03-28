

export const STUDENTS=mysql('stdent',{
    id:int('id').autoincrement().primaryKey(),
    name:varchar('name',{length:20}).notNull(),
    grade:varchar('grade',{lenght:10}).notNull(),
    address:varchar('address',{length:50}),
    contact: varchar('contact',{length:11}),
})