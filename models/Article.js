const { Model, DataTypes } = require("sequelize");
const { format } = require("date-fns");
const esLocale = require("date-fns/locale/es");

class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING(100) },
        content: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING },
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
      { sequelize, modelName: "article", timestamps: true }
    );
    return Article;
  }
}

module.exports = Article;
