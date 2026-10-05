import api from './index'

export const createTechnicalEvaluation = (formData) => {
  return api.post('/technical-evaluations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getTechnicalEvaluation = (id) => {
  return api.get(`/technical-evaluations/${id}`)
}

export const getTechnicalEvaluations = () => {
  return api.get('/technical-evaluations')
}