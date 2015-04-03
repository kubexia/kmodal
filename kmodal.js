(function( $ ) {
    $.fn.kmodal = function(config) {
        var handler = this.selector;
        
        $('form.kmodal-kform').kform({
            onSuccess: function(form,data){
                $('.kmodal').modal('hide');
            }
        });
        
        $(document).on('click',handler,function(e){
            e.preventDefault();
            
            var _this = $(this);
            
            $.ajax({
                type: "GET",
                url: _this.attr('data-request'),
                dataType: 'json',
                data: (_this.attr('data-json') !== undefined ? _this.attr('data-json') : {}),
                success: function(data){
                    var modalBox = $(data.response.content);
                    $('body').append(modalBox);
                    modalBox.modal('show');
                    
                    modalBox.on('hidden.bs.modal', function (e) {
                        modalBox.modal('hide');
                        modalBox.remove();
                        $(".modal-backdrop").remove();
                    });
                },
                error: function(e){
                    console.log(e.responseText);
                }
            });
        });
        
        $(document).on('click','.kmodal-btn-save',function(e){
            e.preventDefault();
            var body = $(this).closest('.modal-content').find('.modal-body');
            var form = body.find('form');
            form.submit();
            return false;
        });
        
    };
})( jQuery );