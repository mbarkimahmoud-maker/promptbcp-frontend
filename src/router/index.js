import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Prompts from '../views/Prompts.vue'
import PromptForm from '../views/PromptForm.vue'
import PromptResult from '../views/PromptResult.vue'
import Upload from '../views/Upload.vue'
import Categories from '../views/Categories.vue'
import TechnicalEvaluation from '../views/TechnicalEvaluation.vue'
import TechnicalEvaluationResult from '../views/TechnicalEvaluationResult.vue'

const routes = [
  { path: '/',              component: Dashboard },
  { path: '/prompts',       component: Prompts },
  { path: '/prompts/:id',   component: PromptForm },
  { path: '/result/:id',    component: PromptResult },
  { path: '/upload',        component: Upload },
  { path: '/categories', component: Categories },
  {
  path: '/technical-evaluation',
  name: 'technical-evaluation',
  component: TechnicalEvaluation
},
{
  path: '/technical-evaluation/:id',
  name: 'technical-evaluation-result',
  component: TechnicalEvaluationResult
},
]

export default createRouter({
  history: createWebHistory(),
  routes,
})