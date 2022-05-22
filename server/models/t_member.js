module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        't_member', 
        {
            id: {
                type: DataTypes.STRING(50),
                primaryKey: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            charset: 'utf8',    // 한국어 설정
            collate: 'utf8_general_ci', // 한국어 설정
            tableName: "t_member", // 테이블 이름
            timestamps: false,  // 만든 시간
        }
    )
};