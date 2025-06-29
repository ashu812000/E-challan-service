const db = {
    /**
     * function to create a new row into a table.
     * @param ctx
     * @param table
     * @param data
     * @returns {Promise<*>}
     */
    async create(ctx, table, data) {
        return ctx.prisma[table].create({data: data});
    },

    /**
     * function to create new rows (multiple) into a table.
     * @param ctx
     * @param table
     * @param data
     * @returns {Promise<*>}
     */
    async createMany(ctx, table, data) {
        return ctx.prisma[table].createMany({data: data})
    },

    /**
     * function to update fields into a row of a table.
     * @param ctx
     * @param table
     * @param where
     * @param data
     * @returns {Promise<*>}
     */
    async update(ctx, table, where, data) {
        return ctx.prisma[table].update({where: where, data: data})

    },

    /**
     * function to update multiple rows of a table.
     * @param ctx
     * @param table
     * @param where
     * @param data
     * @returns {Promise<*>}
     */
    async updateMany(ctx, table, where, data) {

        return ctx.prisma[table].updateMany({where: where, data: data})

    },

    /**
     * function to update a row and create new row when no existing row exists with same data.
     * @param ctx
     * @param table
     * @param where
     * @param createData
     * @param updateData
     * @returns {Promise<*>}
     */
    async upsert(ctx, table, where, createData, updateData) {
        console.log("upsert :",table);
        return ctx.prisma[table].upsert({
            where: where, create: createData, update: updateData
        })
    },

    /**
     * function to delete row from a table.
     * @param ctx
     * @param table
     * @param where
     * @returns {Promise<*>}
     */
    async delete(ctx, table, where) {
        return ctx.prisma[table].delete({where: where})
    },

    /**
     * function to delete many rows from a table.
     * @param ctx
     * @param table
     * @param where
     * @returns {Promise<*>}
     */
    async deleteMany(ctx, table, where) {
        return ctx.prisma[table].deleteMany({where: where})
    },

    /**
     * function to find all the rows of given condition from a table.
     * @param ctx
     * @param table
     * @param where
     * @param include
     * @param orderBy
     * @param take
     * @param select
     * @returns {Promise<*>}
     */
    async findMany(ctx, table, where, include, orderBy, take, select) {
        return ctx.prisma[table].findMany({
            where: where, include: include, orderBy: orderBy, take: take, select: select
        });
    },

    /**
     * function to find a unique row of given condition from a table.
     * @param ctx
     * @param table
     * @param where
     * @returns {Promise<*>}
     */
    async findUnique(ctx, table, where,include) {
        return ctx.prisma[table].findUnique({
            where: where,
            include: include,
        });
    }, /**
     * function to get the first row of the given condition from a table.
     * @param ctx
     * @param table
     * @param where
     * @returns {Promise<*>}
     */
    async findFirst(ctx, table, where) {
        return ctx.prisma[table].findFirst({
            where: where
        });
    }, /**
     * Run a raw query
     * @param ctx
     * @param query
     * @returns {Promise<*>}
     */
    async query(ctx, query) {
        return ctx.prisma.$queryRawUnsafe(query);
    }, /**
     * function to get count of rows
     * @param ctx
     * @param table
     * @param where
     * @returns {Promise<*>}
     */
    async count(ctx, table, where) {
        return ctx.prisma[table].count({
            where: where
        });
    },
}

module.exports = db;