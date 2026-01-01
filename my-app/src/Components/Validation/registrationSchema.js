import Joi from 'joi';

const registrationSchema = Joi.object({
  name: Joi.string()
    .required()
    .custom((value, helpers) => {
      const parts = value.trim().split(/\s+/); 
      if (parts.length < 4) {
        return helpers.message('الاسم يجب أن يكون رباعي');
      }
      return value;
    })
    .messages({
      'string.empty': 'اسم الطالب مطلوب',
    }),

  age: Joi.number().integer().min(1).required().messages({
    'number.base': 'السن يجب أن يكون رقمًا و مطلوب',
    'number.min': 'السن يجب أن يكون على الأقل 1',
    'any.required': 'السن مطلوب',
  }),

  nationalId: Joi.string()
    .pattern(/^\d{14}$/)
    .required()
    .messages({
      'string.empty': 'الرقم القومي مطلوب',
      'string.pattern.base': 'الرقم القومي يجب أن يكون 14 رقم',
    }),

  phone: Joi.string()
    .pattern(/^01[0-9]{9}$/)
    .required()
    .messages({
      'string.empty': 'رقم الهاتف مطلوب',
      'string.pattern.base':'يجب أن يكون رقم موبايل مصري',
    }),

  workplace: Joi.string().max(100).required().messages({
    'string.empty': 'جهة العمل مطلوبة',
    'string.max': 'جهة العمل يجب ألا تزيد عن 100 حرف',
  }),

  job: Joi.string().max(100).required().messages({
    'string.empty': 'الوظيفة مطلوبة',
    'string.max': 'المسمى الوظيفي يجب ألا يزيد عن 100 حرف',
  }),

  residence: Joi.string().max(255).required().messages({
    'string.empty': 'عنوان الإقامة مطلوب',
    'string.max': 'عنوان الإقامة يجب ألا يزيد عن 255 حرف',
  }),

  degree: Joi.string().max(100).required().messages({
    'string.empty': 'المؤهل الدراسي مطلوب',
    'string.max': 'المؤهل الدراسي يجب ألا يزيد عن 100 حرف',
  }),

  status: Joi.string()
    .valid('ENROLLED_ACTIVE', 'TEMPORARILY_EXCLUDED', 'PENDING', 'PERMANENTLY_EXCLUDED', 'SUSPENDED')
    .required()
    .messages({
      'any.only': 'الحالة غير صحيحة',
      'string.empty': 'حالة الطالب مطلوبة',
    }),

  memorizationLevel: Joi.number()
    .min(0)
    .max(30)
    .required()
    .messages({
      'number.base': 'مقدار الحفظ يجب أن يكون رقمًا',
      'number.min': 'مقدار الحفظ لا يمكن أن يكون أقل من 0',
      'number.max': 'مقدار الحفظ لا يمكن أن يزيد عن 30',
      'any.required': 'مقدار الحفظ السابق مطلوب',
    }),

  level: Joi.string()
    .valid('PREPARATORY', 'FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'FINAL')
    .required()
    .messages({
      'any.only': 'المستوى غير صحيح',
      'string.empty': 'مستوى الطالب مطلوب',
    }),

  examinerName: Joi.string().max(100).required().messages({
    'string.empty': 'اسم الشيخ الممتحن مطلوب',
    'string.max': 'اسم الشيخ يجب ألا يزيد عن 100 حرف',
  }),

  actualAttendanceDate: Joi.date().required().messages({
    'date.base': 'تاريخ الحضور غير صحيح',
    'any.required': 'تاريخ الحضور مطلوب',
  }),

  submissionDate: Joi.date().required().messages({
    'date.base': 'تاريخ التقديم غير صحيح',
    'any.required': 'تاريخ التقديم مطلوب',
  }),

  specifiedTime: Joi.string().max(50).required().messages({
    'string.empty': 'الوقت المحدد مطلوب',
    'string.max': 'الوقت المحدد يجب ألا يزيد عن 50 حرف',
  }),

  instituteFees: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.empty': 'الرسوم مطلوبة',
      'string.pattern.base': 'الرسوم يجب أن تكون رقم صحيح أو عشري',
    }),

  studentGroupId: Joi.string().required().messages({
    'string.empty': 'رقم المجموعة مطلوب',
  }),

  receiptNumber: Joi.string().max(50).allow('').messages({
    'string.max': 'رقم الإيصال يجب ألا يزيد عن 50 حرف',
  }),

  receiver: Joi.string().max(100).required().messages({
    'string.empty': 'اسم المستلم مطلوب',
    'string.max': 'اسم المستلم يجب ألا يزيد عن 100 حرف',
  }),

  signature: Joi.string().allow(''), // اختياري
  homePhone: Joi.string().allow(''), // اختياري
});

export default registrationSchema;
