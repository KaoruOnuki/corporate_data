// DataTable
$(document).on('turbolinks:load', function() {
  var table = $('#usersdatatable').DataTable({
    order: [ [ 1, "asc" ] ],
    lengthChange: false,
    displayLength: 5,
    scrollX: false,
    scrollY: 300,
    columnDefs: [
        { className: "dt-body-left", "targets": '_all' },
        { className: "dt-body-nowrap", "targets": [ 1 ] },
    ],
    language: {
      info:         " _TOTAL_ 件中 _START_ ~ _END_ 件表示",
      infoEmpty:    " 0 件中 0 ~ 0 件表示",
      search:       "検索:",
      zeroRecords: "該当件数 0 件",
      emptyTable: "エントリーがありません",
      paginate: {
         "first":    "先頭",
         "previous": "<<",
         "next":     ">>",
         "last":     "最終"
      }
    },
    // ヘッダーサーチ
    initComplete: function() {
      this.api().columns().every(function() {
        var column = this;
        var th = $("#filters").find("th").eq(column.index());
        var select = $('<select><option value="">' + th.text() + '</option></select>')
          .on('change', function() {
            var val = $.fn.dataTable.util.escapeRegex(
              $(this).val());

            column.search(val ? '^' + val + '$' : '', true, false)
              .draw();
          });
        $(th).replaceWith($("<th>", {html: select}));
        column.data().unique().sort().each(function(d, j) {
          $(select).append('<option value="' + d + '">' + d + '</option>')
        });
      });
    },
  });
});

// 反映ボタン
$(document).on('turbolinks:load', function() {
  pageClass = $("body").attr("class");
  if (pageClass == "data_new") {
    reflectBtn();

    // 次のページを押した時
    var btn = document.getElementsByClassName( "paginate_button" );
    // $("#usersdatatable_wrapper").on('click', $(btn), function(){
    //   reflectBtn();
    // });

    $("#usersdatatable_previous").on('click', function(){
      reflectBtn();
    });

    $("#usersdatatable_next").on('click', function(){
      reflectBtn();
    });
  }
  function reflectBtn(){
    $('.reflectionTrigger').click(function () {
      setTr = $(this).parent().parent();

      domain = $(setTr).find(".domain");
      company = $(setTr).find(".company");
      prefecture = $(setTr).find(".prefecture");
      address = $(setTr).find(".address");
      phone = $(setTr).find(".phone");
      fax = $(setTr).find(".fax");
      url = $(setTr).find(".url");
      idNumber = $(setTr).find(".idNumber");
      allElements = [domain, company, prefecture, address, phone, fax, url, idNumber]

      domainForm = document.getElementById("datum_domain");
      companyForm = document.getElementById("datum_company");
      prefectureForm = document.getElementById("datum_prefecture");
      addressForm = document.getElementById("datum_address");
      phoneForm = document.getElementById("datum_phone");
      faxForm = document.getElementById("datum_fax");
      urlForm = document.getElementById("datum_url");
      idNumberForm = document.getElementById("datum_id_number");
      allFormColums = [domainForm, companyForm, prefectureForm, addressForm, phoneForm, faxForm, urlForm, idNumberForm]

      for (i = 0; i < allFormColums.length; i++) {
        $(allFormColums)[i].value = $(allElements)[i][0].innerText;
      }
    });
  };
});

// 検索ウィンドウで下3桁のみを残す(２回目からはこれをdisable)
$(document).on('turbolinks:load', function() {
  var searchContainer = document.getElementById( "usersdatatable_filter" );
  var searchWindow = $(searchContainer).find("input");
  var countUp = 0;
  $(searchWindow).on('input', function(){
    countUp++;
    var searchWord = $(searchWindow).val();
    if (countUp == 1) {
      if (searchWord.length > 0) {
        // 全角半角スペースを自動で削除
        $(searchWindow).val(function(i, v) {
           return v.replace(/\s+/g, "");
         });
        // サブドメイン 以外削除
        getExtension = searchWord.split(".").slice(-3);
        searchWord = getExtension.join(".");
        $(searchWindow).val(searchWord);
      }
    } else {
      if (searchWord.length > 0) {
        $(searchWindow).val(function(i, v) {
           return v.replace(/\s+/g, "");
         });
      }
    }
  });
});

// 入力制限
function validation(){
  domainForm = document.getElementById("datum_domain");
  companyForm = document.getElementById("datum_company");
  prefectureForm = document.getElementById("datum_prefecture");
  addressForm = document.getElementById("datum_address");
  phoneForm = document.getElementById("datum_phone");
  faxForm = document.getElementById("datum_fax");
  urlForm = document.getElementById("datum_url");
  idNumberForm = document.getElementById("datum_id_number");
  allFormColums = [domainForm, companyForm, prefectureForm, addressForm, phoneForm, faxForm, urlForm, idNumberForm]

  var notAccepted = [
    />/g, /</g, /=/g, /＞/g, /＜/g, /＝/g, /;/g, /；/g
  ]

  for (i = 0; i < allFormColums.length; i++) {
    for (n = 0; n < notAccepted.length; n++) {
      if ($(allFormColums[i]).val().match(notAccepted[n])){
        alert("許可されていない記号が含まれています。\n【例】>　<　=　＞　＜　＝　;　；");
        $(allFormColums[i]).val(function(i, v) {
          return v.replace(notAccepted[n], '');
        });
        return false;
      }
    }
  }

  // 全角半角スペースを自動で削除
  for (i = 0; i < allFormColums.length; i++) {
    $(allFormColums[i]).val(function(i, v) {
      return v.replace(/\s+/g, "");
    });
  }
};


// pointバルーンのhoverアクション
$(document).on('turbolinks:load', function() {
  $('.balloon1').hover(
    function() {
      target =  document.getElementById("point1_modal");
      $(target).css('display', 'block');
  },
  function() {
    target =  document.getElementById("point1_modal");
    $(target).css('display', 'none');
  }
  );
  $('.balloon3-left').hover(
    function() {
      target =  document.getElementById("point2_modal");
      $(target).css('display', 'block');
  },
  function() {
    target =  document.getElementById("point2_modal");
    $(target).css('display', 'none');
  }
  );
  $('.balloon3').hover(
    function() {
      target =  document.getElementById("point3_modal");
      $(target).css('display', 'block');
  },
  function() {
    target =  document.getElementById("point3_modal");
    $(target).css('display', 'none');
  }
  );
  $('.balloon3-right-btm').hover(
    function() {
      target =  document.getElementById("point4_modal");
      $(target).css('display', 'block');
  },
  function() {
    target =  document.getElementById("point4_modal");
    $(target).css('display', 'none');
  }
  );
});
