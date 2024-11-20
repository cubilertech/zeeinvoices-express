const Invoice = require("../../models/invoice");
const { fetchAllInvoices , fetchSingleInvoice } = require("../../utils/pipelines");
class InvoiceService {
  static findAll(condition) {
    return new Promise((resolve,reject) => {
      Invoice.find(condition)
        .sort({ createdAt: -1 })
        .exec()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    })
  }
  static findAllWithPipeline(condition, search, options) {
    return new Promise((resolve, reject) => {
      const pipeline = fetchAllInvoices(condition, search, options);
      Invoice.aggregate(pipeline)
        .then((result) => {
          const { totalRecords, invoices } = result[0];
            resolve({ totalRecords, invoices });
          // resolve(records);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static findByWithPipeline(data) {
    return new Promise((resolve, reject) => {
      const pipeline = fetchSingleInvoice(data);
      Invoice.aggregate(pipeline)
        .then((record) => {
          if(record.length > 0)
            resolve(record[0]);
          else
            resolve(record);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static findBy(condition) {
    return new Promise((resolve, reject) => {
      Invoice.findOne(condition)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static exist(condition) {
    return new Promise((resolve, reject) => {
      Invoice.exists(condition)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static update(condition, data) {
    return new Promise((resolve, reject) => {
      Invoice.findOneAndUpdate(condition, data, { new: true })
        .then((record) => {
          resolve(record);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateMany(condition, data) {
    return new Promise((resolve, reject) => {
      Invoice.updateMany(condition, data)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static delete(condition) {
    return new Promise((resolve, reject) => {
      Invoice.findOneAndDelete(condition)
        .then((record) => {
          resolve(record);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static count(condition) {
    return new Promise((resolve, reject) => {
      Invoice.countDocuments(condition)
        .then((count) => {
          resolve(count);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      Invoice.create(data)
        .then((record) => {
          resolve(record);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = InvoiceService;
