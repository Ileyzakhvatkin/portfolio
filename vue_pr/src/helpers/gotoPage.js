import eventBus from '@/eventBus';
// Метод который отправляет событие в глобальную щину
export default function gotoPage(pageName, pageParams) {
  eventBus.$emit('gotoPage', pageName, pageParams);
}
