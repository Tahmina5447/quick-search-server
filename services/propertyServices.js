const Properties = require("../models/propertyModel");

exports.createProperyService = async (data) => {
  const result = await Properties.create(data);
  return result;
};

exports.getPropertiesService = async (filters, queries) => {
  try {
    // Execute both queries in parallel
    const [properties, total] = await Promise.all([
      Properties.find(filters)
        // .populate("variant")
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sort),
        Properties.countDocuments(filters),
    ]);

    const page = Math.ceil(total / queries.limit);
    return { total, page, properties };
  } catch (error) {
    throw new Error(`Failed to fetch properties: ${error.message}`);
  }
};

exports.getPropertyByIdService = async (id) => {
  let retries = 3;
  while (retries) {
    try {
      const property = await Properties.findById(id)
      return property;
    } catch (error) {
      retries -= 1;
      if (retries === 0) throw error;
      console.log(`Retrying... ${3 - retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
};

exports.updatePropertyByIdService = async (id, body) => {
  const result = await Properties.updateOne({ _id: id }, body);
  return result;
};

exports.deletePropertyByIdService = async (id) => {
  const result = await Properties.deleteOne({ _id: id });
  return result;
};


