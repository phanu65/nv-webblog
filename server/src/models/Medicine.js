module.exports = (sequelize, DataTypes) => {
    const Medicine = sequelize.define('Medicine', {
        name: {
            type: DataTypes.STRING,           // ชื่อยา
            allowNull: false,                 // ไม่อนุญาตให้เป็นค่า null
            validate: {
                len: {
                    args: [1, 255],           // ความยาวระหว่าง 1 ถึง 255 ตัวอักษร
                    msg: 'ชื่อยาต้องมีความยาวระหว่าง 1 ถึง 255 ตัวอักษร' // ข้อความแสดงเมื่อไม่ผ่านการตรวจสอบ
                }
            }
        },
        type: {
            type: DataTypes.STRING,           // ประเภทยา
            allowNull: false,                 // ไม่อนุญาตให้เป็นค่า null
            validate: {
                len: {
                    args: [1, 100],           // ความยาวระหว่าง 1 ถึง 100 ตัวอักษร
                    msg: 'ประเภทต้องมีความยาวระหว่าง 1 ถึง 100 ตัวอักษร' // ข้อความแสดงเมื่อไม่ผ่านการตรวจสอบ
                }
            }
        },
        description: {
            type: DataTypes.TEXT,              // สรรพคุณ
            allowNull: true,                   // อนุญาตให้เป็นค่า null
        },
        expirationDate: {
            type: DataTypes.DATE,              // วันหมดอายุ
            allowNull: false,                  // ไม่อนุญาตให้เป็นค่า null
            validate: {
                isDate: {
                    msg: 'วันหมดอายุต้องเป็นวันที่ที่ถูกต้อง' // ข้อความแสดงเมื่อไม่ผ่านการตรวจสอบ
                }
            }
        },
    }, {
        timestamps: true,                     // เพิ่ม createdAt และ updatedAt
        tableName: 'medicines'                // ชื่อของตารางในฐานข้อมูล
    });

    return Medicine;
}
