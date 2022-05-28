module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        't_memory', 
        {
            memory_idx: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(300),
                allowNull: false
            },
            contents: {
                type: DataTypes.STRING(3000),
            },
            memory_date:{
                type: DataTypes.DATE,
                allowNull: false
            },
            creator_id:{
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },
        {
            charset: 'utf8',    // 한국어 설정
            collate: 'utf8_general_ci', // 한국어 설정
            tableName: "t_memory", // 테이블 이름
            timestamps: false,  // 만든 시간
        }
    )
};