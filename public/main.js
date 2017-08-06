document.addEventListener('DOMContentLoaded', () => {
  let update = document.getElementById('update');
  let del = document.getElementById('delete');

  update.addEventListener('click', () => {
    fetch('/quotes', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Darth Vader',
        quote: 'I find your lack of faith disturbing'
      })
    }).then(res => {
      if (res.ok)  {
        return res.json();
      }
    }).then(data => {
      console.log(data);
      window.location.reload(true);
    });
  });

  del.addEventListener('click', function () {
    fetch('/quotes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Darth Vader'
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(data => {
      debugger;
      console.log(data);
      window.location.reload();
    });
  });
});
