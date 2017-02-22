class RecordsController < ApplicationController

  def index
    @records = Record.all
  end

  def create
    @record = Record.new(record_params)
    if @record.save
      #handle successful creation
      flash[:success] = "BAM"
      render json: @record
    else
      #handle problem
      flash[:danger] = "Something went wrong. :("
      render 'new'
    end
  end

  def destroy
    @record = Record.find(params[:id])
    puts @record.title.to_s + " is getting destroyed!"
    @record.destroy
    head :no_content
  end


  private

    def record_params
      params.require(:record).permit(:title,:date,:amount)
    end

end
