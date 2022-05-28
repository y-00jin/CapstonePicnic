module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        't_file', 
        {
            file_idx: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            memory_idx: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            original_file_name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            stored_file_path: {
                type: DataTypes.STRING(500),
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
            tableName: "t_file", // 테이블 이름
            timestamps: false,  // 만든 시간
        }
    )
};