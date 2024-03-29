import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('div[data-type="resizable"]')
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value;

  $resizer.css({
    opacity: 1,
    [sideProp]: type === 'col' ? -$root.$el.scrollHeight + $resizer.$el.clientHeight + 'px' : -$root.$el.scrollWidth + $resizer.$el.clientWidth + 'px'
  });

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;

      $resizer.css({
        right: -delta + 'px'
      });
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;

      $resizer.css({ bottom: -delta + 'px' });
    }
  };

  document.onmouseup = () => {
    document.onmouseup = null;
    document.onmousemove = null;

    if (type === 'col') {
      $parent.css({
        width: `${value}px`
      });

      $root.findAll(`[data-col="${$parent.data.col}"]`)
      .forEach((el) => el.style.width = value + 'px');
    } else {
      $parent.css({
        height: `${value}px`
      });
    }


    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    });
  }
}