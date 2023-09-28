const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static initModel(sequelize) {
    Comment.init(
      {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        fullName: { type: DataTypes.STRING(100) },
        content: { type: DataTypes.STRING },
        customDate: {
          type: DataTypes.VIRTUAL,
          get() {
            const dayNumber = format(this.createdAt, "dd", {
              locale: esLocale,
            });
            const monthName = format(this.createdAt, "MMMM", {
              locale: esLocale,
            });
            const yearNumber = format(this.createdAt, "yyy", {
              locale: esLocale,
            });
            const formattedDate = `${dayNumber} de ${monthName}, ${yearNumber}`;
            return formattedDate;
          },
        },
      },
      { sequelize, modelName: "comment", timestamps: true }
    );

    return Comment;
  }
}

module.exports = Comment;
